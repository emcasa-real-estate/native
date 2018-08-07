export const getNavigation = (state) => state.screens.navigation

export const getCurrentScreen = (state) => getNavigation(state).screen
