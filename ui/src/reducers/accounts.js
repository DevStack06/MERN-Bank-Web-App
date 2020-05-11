import * as ActionTypes from "../actions/constants";

const accounts = (
  state = {
    isFetching: false,
    showTransferFundsButton: false,
    item: {},
    items: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.REQUEST_ACCOUNTBYID:
      return Object.assign({}, state, {
        item: state.items.find((account) => account.id == action.id),
      });

    case ActionTypes.REQUEST_ACCOUNTS:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case ActionTypes.RECEIVE_ACCOUNTS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.response,
        showTransferFundsButton:
          Array.isArray(action.response) && action.response.length > 1,
      });
    case ActionTypes.SHOW_NEW_ACCOUNTS_FORM:
      return Object.assign({}, state, {
        showNewAccountForm: true,
      });
    case ActionTypes.HIDE_NEW_ACCOUNTS_FORM:
      return Object.assign({}, state, {
        showNewAccountForm: false,
        nameValidationMessage: null,
        openingBalanceValidationMessage: null,
      });
    case ActionTypes.CREATE_ACCOUNT_VALIDATION_FAILURE:
      return Object.assign({}, state, {
        nameValidationMessage: action.validationResult.nameValidationMessage,
        openingBalanceValidationMessage:
          action.validationResult.openingBalanceValidationMessage,
      });
    case ActionTypes.CREATE_ACCOUNT_SUCCESS:
      const items = [...state.items, action.response];
      return Object.assign({}, state, {
        items,
        showNewAccountForm: false,
        showTransferFundsButton: items.length > 1,
      });
    case ActionTypes.SHOW_TRANSFER_FUNDS:
      return Object.assign({}, state, {
        showTransferFunds: true,
      });
    case ActionTypes.HIDE_TRANSFER_FUNDS:
      return Object.assign({}, state, {
        showTransferFunds: false,
        fromAccountValidationMessage: null,
        toAccountValidationMessage: null,
        transferAmountValidationMessage: null,
      });
    case ActionTypes.TRANSFER_FUNDS_VALIDATION_FAILURE:
      return Object.assign({}, state, {
        fromAccountValidationMessage:
          action.validationResult.fromAccountValidationMessage,
        toAccountValidationMessage:
          action.validationResult.toAccountValidationMessage,
        transferAmountValidationMessage:
          action.validationResult.transferAmountValidationMessage,
      });
    case ActionTypes.UPDATE_ACCOUNT_BALANCE_SUCCESS:
      let index = state.items.indexOf(
        state.items.find((a) => a.id === action.response.id)
      );
      let account = Object.assign({}, state.items[index], {
        balance: action.response.balance,
      });
      let result = Object.assign({}, state, {
        items: [
          ...state.items.slice(0, index),
          account,
          ...state.items.slice(index + 1),
        ],
      });
      return result;
    default:
      return state;
  }
};

export default accounts;
