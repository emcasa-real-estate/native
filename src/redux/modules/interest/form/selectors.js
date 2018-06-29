import {createSelector} from 'reselect'

export const getInterestForm = (state) => state.interest.form

export const isLoading = createSelector(getInterestForm, (form) => form.loading)

export const getError = createSelector(getInterestForm, (form) => form.error)
