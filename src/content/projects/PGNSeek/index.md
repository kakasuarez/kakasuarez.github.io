---
title: "PGNSeek"
description: "Natural language chess search"
date: "Apr 20 2026"
demoURL: "https://pgn-seek.vercel.app"
repoURL: "https://github.com/kakasuarez/PGNSeek"
---

# PGNSeek

PGNSeek is a search platform that helps users explore massive collections of chess games using simple, natural-language queries instead of complex filters or database syntax.

The project was built to make large chess datasets easier to navigate, analyze, and learn from. Users can search for games by style, openings, player strength, game length, or tactical themes, while the system delivers fast, relevant, and explainable results.

- Makes millions of chess games searchable through plain English queries
- Helps users discover games based on play style and tactical patterns
- Organizes large PGN archives into a fast, structured search experience
- Provides similar-game recommendations using gameplay characteristics
- Supports scalable ingestion and indexing of large historical datasets

## Highlights

- Built a natural-language chess search engine powered by Elasticsearch
- Designed a scalable ingestion pipeline capable of processing large PGN datasets efficiently
- Improved search quality by generating chess-specific metadata and gameplay features
- Implemented similarity search to surface strategically related games
- Focused on fast, explainable, and consistent search results without relying on black-box AI systems
- Added resumable ingestion and deduplication to make large-scale indexing reliable

## Example Searches

Users can search naturally with queries like:

- “aggressive Sicilian games under 30 moves”
- “Carlsen wins with White Catalan”
- “2500+ Caro-Kann”

## Technical Overview

### Backend

- Python
- FastAPI
- Elasticsearch

### Chess Processing

- python-chess
- Custom feature extraction pipeline

### Infrastructure

- Docker
- Kibana
- Structured logging and environment-based configuration

## Key Capabilities

### Natural-Language Search

The platform converts free-text queries into structured search logic, allowing users to search chess data intuitively.

### Similarity Search

Games are analyzed and represented using gameplay features, enabling “find similar games” functionality.

### Scalable Data Processing

The ingestion pipeline supports:

- Bulk indexing
- Deduplication
- Checkpoint-based recovery
- Large dataset processing

## Why This Project Matters

Chess databases are often difficult to explore unless users already know exact openings, player names, or filtering systems. PGNSeek improves discoverability by making chess data searchable in a more human and intuitive way.

The project demonstrates:

- Search and information retrieval engineering
- Scalable backend system design
- Domain-specific data modeling
- API development
- Large-scale data processing
- Relevance and ranking systems

## Future Improvements

- Semantic and embedding-based retrieval
- Personalized recommendations
- Opening explorer and analytics UI
- Distributed ingestion workers
- Hybrid keyword + vector ranking
