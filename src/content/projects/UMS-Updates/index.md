---
title: "UMS Updates"
description: "Telegram bot for automatic notices"
date: "January 15 2026"
demoURL: "https://t.me/ums_updates_bot"
repoURL: "https://github.com/kakasuarez/ums-updates"
---

# IMS Notice Notification Bot

A Telegram bot that automatically tracks university department notice boards and delivers newly published notices directly to subscribed students in real time.

The project was built to solve a simple but frustrating problem: students missing important academic updates because the university portal is difficult to monitor consistently. Instead of manually refreshing the portal multiple times a day, users receive notices instantly inside Telegram along with the official PDF attachments.

---

## Features

- Real-time monitoring of university department notice boards
- Automatic delivery of new notices to Telegram users
- Department-specific subscriptions
- Interactive Telegram-based subscription management
- Automatic PDF retrieval and forwarding
- Duplicate notice detection
- Persistent storage using SQLite
- Structured logging and operational monitoring
- Restart-safe architecture
- AWS EC2 deployment with `systemd` auto-recovery
- Metrics tracking for reliability and usage analysis

---

## How It Works

The system continuously monitors department notice boards on the university portal.

When a new notice is detected:

1. The scraper retrieves the notice details
2. Associated PDFs are downloaded from secured/tokenized endpoints
3. The notice is fingerprinted to prevent duplicate delivery
4. Subscribed users are identified
5. The notice and attachment are delivered through Telegram

Users can subscribe to one or multiple departments and only receive updates relevant to them.

---

## System Architecture

The application follows a centralized scraping and fan-out architecture:

```text
University Portal
        │
        ▼
 Centralized Scraper
        │
        ▼
 Notice Processing Layer
  - Duplicate Detection
  - Fingerprinting
  - PDF Retrieval
        │
        ▼
 Subscription Manager (SQLite)
        │
        ▼
 Telegram Delivery Service
        │
        ▼
     End Users
```

This architecture ensures:

- Efficient handling of multiple subscribers
- Reduced scraping overhead
- Reliable notice distribution
- No race conditions or duplicate alerts
- Restart-safe persistence

---

## Technical Highlights

### Web Scraping

The scraper handles:

- Session-aware requests
- Dynamic form submissions
- Tokenized PHP endpoints
- Authenticated PDF downloads
- Structured notice extraction

---

### Reliability & Persistence

The system was designed with long-term uptime and operational stability in mind.

Key reliability features include:

- Persistent SQLite storage
- Restart-safe state recovery
- Duplicate notice fingerprinting
- Structured logging
- Error isolation
- Continuous background execution

Operational metrics tracked include:

- Message delivery counts
- Delivery latency
- Active subscribers
- Restart events
- Scraper activity statistics

---

The focus of the project was not only functionality, but also reliability, maintainability, and real-world usability over long-term operation.
