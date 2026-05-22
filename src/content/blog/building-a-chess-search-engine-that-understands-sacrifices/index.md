---
title: "Building a Chess Search Engine That Understands Sacrifices"
description: "What I learnt while building a chess search engine that understands sacrifices."
date: "05/22/2026"
---

I learnt several things while I was working on my project [PGNSeek](/projects/PGNSeek). One of them was in regards to piece sacrifices in the chess games.

## The Problem

A key problem that I ran into was figuring out when a player sacrificed one of their pieces. This was a critical requirement for my planned similarity search feature wherein you would be able to search for games similar to the current one you were looking at. As a result, detecting sacrifices, whether they were clean sacrifices or exchange-sacrifices, was important.

## The Naïve Solution

The first thing I tried was naïvely detecting sacrifices by calculating the material remaining for each side after every ply (half-move). This ran into the obvious problem of marking fair trades as sacrifices.

```py
# WRONG — fires on every capture, including equal trades
swing = abs(bal - prev_bal)
if swing >= settings.SACRIFICE_DELTA:
    sacrifices += 1
```

Every time there's a material swing, it counts a sacrifice even though trades also have swings for a half-move.

## Discoveries

After the first approach failed, I attempted to fix it by looking at evaluations over a window of half-moves, instead of every half-move.
After any swing ≥ 3 points, I looked 2 half-moves ahead. If the balance returned to within 1 point of its pre-capture level, I considered it a trade. Only unrecovered swings counted as sacrifices.
This should have solved the problem, however upon further investigation I found out several other bugs:

- `pre_swing_bal` carried the imbalance from a previous unresolved capture into the next iteration, making the recapture look like a non-recovering swing.
- The recovery window of 1 was too small — some combinations took more than 1 half-move to resolve.
- Material swing where a piece is captured and the position is already unequal. An exchange in a position where one side is already losing material is not a voluntary sacrifice.

There was one underlying bug causing cases 1, 2, and 3:

`pre_swing_bal` is taken from `balances[i-1]`, which may itself <u>already reflect a prior unresolved capture</u>. The recovery check then compares the future balance to this already-imbalanced baseline, making normal play in unequal positions look like unrecovered sacrifices.

## The Fix

The fix is to track the stable pre-combination balance — the balance before any ongoing exchange sequence started — rather than the balance one half-move ago.

### The correct algorithm

Instead of examining each half-move in isolation, it first identifies the full extent of an exchange sequence — a consecutive run of moves where every half-move involves a large material swing. It then measures the net change across the entire sequence against the stable balance before the sequence started. Only if that net change is ≥ `SAC_DELTA` and persists for `QUIET_MOVES_REQUIRED` non-capturing moves afterward is it counted as a sacrifice.
This collapses the three failure modes into one fix. It's not a perfect substitute for engine evaluation, but it eliminates the false positives I was actually seeing without any Stockfish dependency.
The reader is invited to look at the code present in the repository for this implementation.

## Tradeoffs

Of course, I cannot say that this algorithm is one that is flawless. However, for my use-case, it seemed to work just fine. The best way would be obviously to use a chess engine like Stockfish to find out both material swings as well as evaluation swings. Unfortunately, running Stockfish for every single game in my database would take far too much time than I could allow. As a result, the current implementation has a tradeoff between accuracy and time taken to calculate sacrifices per game.
