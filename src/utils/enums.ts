export enum applicationStatus {
  applied = 0,
  approved = 1,
  denied = 2,
  purchased = 3,
}

// TODO think we can just have Create and Update
export enum requestType {
  permitCreate = 0,
  permitUpdate = 1,
  loanCreate = 2,
  loanUpdate = 3,
}
