import { connectDB } from "../../database/db";

export class ChampionRepository {
  static async getAll(rank: string) {
    try {
      const db = await connectDB();
      const championCollection = db.db("SET15").collection("champions");
      const totalGamesCollection = db.db("SET15").collection("totalGames");

      // Get all champions
      const championsDocs = await championCollection.find().toArray();
      const totalGamesDoc = await totalGamesCollection.findOne({ id: "totalGames" });
      const totalGames = totalGamesDoc?.count || 0;

      let championsData;
      if (rank !== "all") {
        championsData = championsDocs.map((champion) => ({
          championId: champion.championId{
    "explorer.confirmDelete": false,
    "liveServer.settings.donotShowInfoMsg": true,
    "editor.inlineSuggest.enabled": true,
    "wallpaper-setting.filePath": "c:\\Users\\vince\\Downloads\\animegirl.jpeg",
    "wallpaper-setting.opacity": 0.9,
    "editor.accessibilitySupport": "off",
    "liveServer.settings.donotVerifyTags": true,
    "liveServer.settings.wait": 1,
    "liveServer.settings.useLocalIp": true,
    "files.autoSave": "afterDelay",
    "github.copilot.enable": {
        "*": true,
        "yaml": false,
        "plaintext": false,
        "markdown": false
    },
    "explorer.confirmDragAndDrop": false,
    "workbench.iconTheme": "fira-code-material-icon-theme",
    "codemosModern.dark.auxiliaryUiTheme": null,
    "codemosModern.dark.design": "modern",
    "codemosModern.dark.accentColor": "#CB8569",
    "codemosModern.dark.adaptiveMode": "gentle",
    "codemosModern.dark.auxiliaryCodeTheme": "Codemos-Inc/Auxiliary-Theme-Registry/Microsoft/Defaults/Dark+",
    "editor.fontFamily": "Fira Code",
    "editor.fontLigatures": true,
    "git.autofetch": true,
    "editor.cursorBlinking": "expand",
    "workbench.editorAssociations": {
        "*.copilotmd": "vscode.markdown.preview.editor",
        "*.zip": "default",
        "*.msi": "default"
    },
    "window.confirmSaveUntitledWorkspace": false,
    "javascript.updateImportsOnFileMove.enabled": "always",
    "rapidapi.terminalLink.enabled": false,
    "git.enableSmartCommit": true,
    "diffEditor.ignoreTrimWhitespace": false,
    "git.confirmSync": false,
    "github.copilot.editor.enableAutoCompletions": true,
    "git.openRepositoryInParentFolders": "never",
    "vscode_custom_css.imports": [
        "file:///c:/Users/vince/.vscode/extensions/brandonkirbyson.vscode-animations-2.0.7/dist/updateHandler.js"
    ],
    "animations.Enabled": true,
    "editor.unicodeHighlight.invisibleCharacters": false,
    "typescript.updateImportsOnFileMove.enabled": "always",
    "terminal.integrated.enableMultiLinePasteWarning": false,
    "editor.stickyScroll.enabled": false,
    "editor.minimap.size": "fill",
    "editor.wordWrap": "on",
    "editor.largeFileOptimizations": false,
    "workbench.editor.empty.hint": "hidden",
    "chat.instructionsFilesLocations": {
      ".github/instructions": true,
      "C:\\Users\\vince\\AppData\\Local\\Temp\\postman-http-request-post-response.instructions.md": true,
      "C:\\Users\\vince\\AppData\\Local\\Temp\\postman-http-request-pre-request.instructions.md": true,
      "C:\\Users\\vince\\AppData\\Local\\Temp\\postman-collections-post-response.instructions.md": true,
      "C:\\Users\\vince\\AppData\\Local\\Temp\\postman-collections-pre-request.instructions.md": true,
      "C:\\Users\\vince\\AppData\\Local\\Temp\\postman-folder-post-response.instructions.md": true,
      "C:\\Users\\vince\\AppData\\Local\\Temp\\postman-folder-pre-request.instructions.md": true,
      "/var/folders/ty/f9_36_555vq2dwkj7zsr01wh0000gn/T/postman-collections-post-response.instructions.md": true,
      "/var/folders/ty/f9_36_555vq2dwkj7zsr01wh0000gn/T/postman-collections-pre-request.instructions.md": true,
      "/var/folders/ty/f9_36_555vq2dwkj7zsr01wh0000gn/T/postman-folder-post-response.instructions.md": true,
      "/var/folders/ty/f9_36_555vq2dwkj7zsr01wh0000gn/T/postman-folder-pre-request.instructions.md": true,
      "/var/folders/ty/f9_36_555vq2dwkj7zsr01wh0000gn/T/postman-http-request-post-response.instructions.md": true,
      "/var/folders/ty/f9_36_555vq2dwkj7zsr01wh0000gn/T/postman-http-request-pre-request.instructions.md": true
    },
    "debug.onTaskErrors": "debugAnyway",
    "githubPullRequests.createOnPublishBranch": "never",
    "[typescriptreact]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[json]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "editor.detectIndentation": false,
    "docker.extension.dockerEngineAvailabilityPrompt": false,
    "workbench.experimental.share.enabled": true,
    "security.workspace.trust.untrustedFiles": "open",
    "editor.pasteAs.preferences": [

    ],
    "python.defaultInterpreterPath": "/opt/homebrew/bin/python3",
    "code-runner.runInTerminal": true,
    "terminal.integrated.fontSize": 13,
    "editor.tabSize": 2,
    "postman.mcp.notifications.postmanMCP": false,
    "C_Cpp.default.cppStandard": "c++23",
    "github.copilot.chat.agent.runTasks": false,
    "github.copilot.chat.scopeSelection": true,
    "github.copilot.nextEditSuggestions.enabled": true,
    "github.copilot.chat.codesearch.enabled": true,
    "github.copilot.chat.agent.thinkingTool": true,
    "github.copilot.chat.edits.temporalContext.enabled": true,
    "github.copilot.chat.languageContext.fix.typescript.enabled": true,
    "github.copilot.chat.languageContext.inline.typescript.enabled": true,
    "github.copilot.chat.generateTests.codeLens": true,
    "github.copilot.chat.languageContext.typescript.enabled": true,
    "github.copilot.chat.notebook.followCellExecution.enabled": true,
    "workbench.colorTheme": "Tokyo Night Frameless",
    "workbench.tree.renderIndentGuides": "always",
    "workbench.activityBar.location": "hidden",
    "workbench.editor.showTabs": "single",
    "editor.minimap.renderCharacters": false,
    "editor.minimap.enabled": false,
    "terminal.integrated.tabs.enabled": false,
    "workbench.settings.openDefaultSettings": true,
    "workbench.settings.openDefaultKeybindings": true,
    "custom-ui-style.electron": {
      "frame": false,
      "transparent": true,
      "opacity": 0.95
    },
    "window.commandCenter": false,
    "window.titleBarStyle": "custom",
    "extensions.experimental.affinity": {
      "asvetliakov.vscode-neovim": 1
    }
},
          ...(champion.ranks?.[rank] || {
            totalGames: 0,
            wins: 0,
            winrate: 0,
            averagePlacement: 0,
          }),
        }));
      } else {
        championsData = championsDocs;
      }

      // Sort by averagePlacement (best placement = lowest number)
      const sortedChampions = championsData.sort(
        (a, b) => Number(a.averagePlacement) - Number(b.averagePlacement)
      );

      return {
        totalGames: totalGames,
        championData: sortedChampions,
      };
    } catch (error) {
      console.error("Error fetching champion data from DB:", error);
      return { champions: [], totalGames: 0 };
    }
  }

  static async updateMany(rank: string, championsRanking: any[]) {
    try {
      const db = await connectDB();
      const championsCollection = db.db("SET15").collection("champions");

      const updatedChampions = await Promise.all(
        championsRanking.map((champion) =>
          this.updateSingleChampion(championsCollection, rank, champion)
        )
      );

      await this.updateTotalGamesCount(db, championsRanking.length  );

      const sortedUpdatedChampions = updatedChampions.sort(
        (a, b) => a.averagePlacement - b.averagePlacement
      );

      return { updatedChampions: sortedUpdatedChampions, totalGames: 0 };
    } catch (error) {
      console.error("Error updating champion data in DB:", error);
      return { updatedChampions: [], totalGames: 0 };
    }
  }

  // Extract champion update logic
  private static async updateSingleChampion(collection: any, rank: string, champion: any) {
    const existingChampion = await collection.findOne({ championId: champion.championId });

    const globalStats = this.calculateGlobalStats(existingChampion, champion);
    const rankStats = this.calculateRankStats(existingChampion, champion, rank);

    // Single update operation combining both global and rank stats
    await collection.updateOne(
      { championId: champion.championId },
      {
        $set: {
          ...globalStats,
          [`ranks.${rank}`]: rankStats,
        },
      },
      { upsert: true }
    );

    console.log(`Updated stats for champion ${champion.championId}`);
    return {
      championId: champion.championId,
      ...globalStats,
    };
  }

  // Extract global stats calculation
  private static calculateGlobalStats(existingChampion: any, champion: any) {
    const totalGames = (existingChampion?.totalGames || 0) + champion.totalGames;
    const wins = (existingChampion?.wins || 0) + champion.wins;

    const averagePlacement = Number(
      (
        (champion.placement * champion.totalGames +
          (existingChampion?.averagePlacement || 0) * (existingChampion?.totalGames || 0)) /
        totalGames
      ).toFixed(2)
    );

    const winrate = Number(((wins / totalGames) * 100).toFixed(2));

    return { totalGames, wins, winrate, averagePlacement };
  }

  // Extract rank-specific stats calculation
  private static calculateRankStats(existingChampion: any, champion: any, rank: string) {
    const winsRank = (existingChampion?.ranks?.[rank]?.wins || 0) + champion.wins;
    const totalGamesRank = (existingChampion?.ranks?.[rank]?.totalGames || 0) + champion.totalGames;

    const winrateRank = Number(((winsRank / totalGamesRank) * 100).toFixed(2));

    const averagePlacementRank = Number(
      (
        (champion.placement * champion.totalGames +
          (existingChampion?.ranks?.[rank]?.averagePlacement || 0) *
            (existingChampion?.ranks?.[rank]?.totalGames || 0)) /
        totalGamesRank
      ).toFixed(2)
    );

    return {
      totalGames: totalGamesRank,
      wins: winsRank,
      winrate: winrateRank,
      averagePlacement: averagePlacementRank,
    };
  }

  // Extract total games update logic
  private static async updateTotalGamesCount(db: any, increment: number) {
    const totalGamesCollection = db.db("SET15").collection("totalGames");

    await totalGamesCollection.updateOne(
      { id: "totalGames" },
      { $inc: { count: increment } },
      { upsert: true }
    );
  }
}
