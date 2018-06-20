export const getNavigation = (state) => state.screens.navigation

export const getCurrentScreen = (state) => getNavigation(state).screen

export const getCurrentTab = (state) => getNavigation(state).tab
