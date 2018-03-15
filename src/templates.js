module.exports = [
  {
    folderName: 'root',
    files: [
      {
        fileName: 'App.js',
        fileContent: require('./App.js')
      },
      {
        fileName: 'index.js',
        fileContent: require('./index.js')
      }
    ]
  },
  // Components
  {
    folderName: 'Components',
    files: [
      {
        fileName: 'Page.js',
        fileContent: require('./Components/Page')
      },
      {
        fileName: 'Wrapper.js',
        fileContent: require('./Components/Wrapper')
      },
      {
        fileName: 'README.md',
        fileContent: require('./Components/README')
      }
    ]
  },
  // Config
  {
    folderName: 'Config',
    files: [
      {
        fileName: 'ApiConfig.js',
        fileContent: require('./Config/ApiConfig')
      },
      {
        fileName: 'AppConfig.js',
        fileContent: require('./Config/AppConfig')
      },
      {
        fileName: 'DevConfig.js',
        fileContent: require('./Config/DevConfig')
      },
      {
        fileName: 'AppConfig.js',
        fileContent: require('./Config/AppConfig')
      },
      {
        fileName: 'ReduxPersistConfig.js',
        fileContent: require('./Config/ReduxPersistConfig')
      },
      {
        fileName: 'README.md',
        fileContent: require('./Config/README')
      }
    ]
  },
  // Containers
  {
    folderName: 'Containers',
    files: [
      {
        fileName: 'RootContainer.js',
        fileContent: require('./Containers/RootContainer')
      },
      {
        fileName: 'README.md',
        fileContent: require('./Containers/README')
      }
    ]
  },
  // Images
  {
    folderName: 'Images',
    files: [
      {
        fileName: 'README.md',
        fileContent: require('./Images/README')
      }
    ]
  },
  // Lib
  {
    folderName: 'Lib',
    files: [
      {
        fileName: 'README.md',
        fileContent: require('./Lib/README')
      }
    ]
  },
  // Mock
  {
    folderName: 'Mock',
    files: [
      {
        fileName: 'README.md',
        fileContent: require('./Mock/README')
      }
    ]
  },
  // Navigation
  {
    folderName: 'Navigation',
    files: [
      {
        fileName: 'AppNavigation.js',
        fileContent: require('./Navigation/AppNavigation')
      },
      {
        fileName: 'Loading.js',
        fileContent: require('./Navigation/Loading')
      },
      {
        fileName: 'Routes.js',
        fileContent: require('./Navigation/Routes')
      },
      {
        fileName: 'README.md',
        fileContent: require('./Navigation/README')
      }
    ]
  },
  // Redux
  {
    folderName: 'Redux',
    files: [
      {
        fileName: 'CreateStore.js',
        fileContent: require('./Redux/CreateStore')
      },
      {
        fileName: 'index.js',
        fileContent: require('./Redux/index.js')
      },
      {
        fileName: 'LoginRedux.js',
        fileContent: require('./Redux/LoginRedux')
      },
      {
        fileName: 'StartupRedux.js',
        fileContent: require('./Redux/StartupRedux')
      },
      {
        fileName: 'ReduxSelectors.js',
        fileContent: require('./Redux/ReduxSelectors')
      },
      {
        fileName: 'README.md',
        fileContent: require('./Redux/README')
      }
    ]
  },
  // Routes
  {
    folderName: 'Routes',
    files: [
      {
        fileName: 'LandingPage.js',
        fileContent: require('./Routes/LandingPage')
      },
      {
        fileName: 'NextPage.js',
        fileContent: require('./Routes/NextPage')
      },
      {
        fileName: 'README.md',
        fileContent: require('./Routes/README')
      }
    ]
  },
  // Utils
  {
    folderName: 'Utils',
    files: [
      {
        fileName: 'README.md',
        fileContent: require('./Utils/README')
      }
    ]
  }
]
