export const getNavigation = (state) => state.screens.navigation

export const getStackRootId = (state) => getNavigation(state).rootId

export const getCurrentTabIndex = (state) => getNavigation(state).tabIndex

export const getCurrentScreen = (state) => getNavigation(state).screen
