export const listingFormScreen = (state) => state.screens.listingForm

export const getListing = (state) => listingFormScreen(state).listing

export const getValue = (state) => listingFormScreen(state).value

export const getError = (state) => listingFormScreen(state).error

export const isLoading = (state) => listingFormScreen(state).loading
