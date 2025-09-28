backend/services/
├── riot/                         # Raw API fetching
│   ├── matchFetcher.ts         
│   ├── leaderboardFetcher.ts    
│   └── playerService.ts         # ✅ Keep
├── statistics/                   # ✅ Keep separate
│   ├── statisticsService.ts     # Orchestrates everything
│   └── processors/              # Processing logic
├── leaderboard/                  # New unified service
│   └── leaderboardService.ts    # Orchestrates fetcher + repository
└── database/                # Database operations
    ├── championRepository.ts
    ├── itemRepository.ts
    ├── traitRepository.ts
    └── leaderboardRepository.ts