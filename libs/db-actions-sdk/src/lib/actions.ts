export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  createNewUser: Create_New_User_Out;
  login: Login_Out;
};


export type MutationCreateNewUserArgs = {
  input: Create_New_User_In;
};


export type MutationLoginArgs = {
  input: Login_In;
};

export type Create_New_User_In = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Create_New_User_Out = {
  __typename?: 'create_new_user_out';
  accessToken: Scalars['String']['output'];
};

export type Login_In = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Login_Out = {
  __typename?: 'login_out';
  accessToken: Scalars['String']['output'];
};
