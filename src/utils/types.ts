import { applicationStatus } from './enums';

export type Permit = {
  id: number;
  owner: string;
  propertyAddress: string;
  document: string;
  licenceNumber: string;
  status: applicationStatus;
};

export type Loan = {
    id: number;
    owner: string;
    fullName: string;
    annualIncome: number;
    propertyAddress: string;
    loanAmount: number;
    status: applicationStatus;
  };