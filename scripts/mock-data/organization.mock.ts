import { Organization } from '@prisma/client';

export const MOCK_ORGANIZATION_SAP_SE: Organization = {
  id: 'fed2a74b-19bc-404a-884c-410eab90b0be',
  as: 'AS200291',
  name: 'SAP SE',
};

export const MOCK_ORGANIZATION_GOOGLE: Organization = {
  id: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
  as: 'AS15169',
  name: 'Google LLC',
};

export const MOCK_ORGANIZATION_MICROSOFT: Organization = {
  id: 'b2c3d4e5-6789-01ab-cdef-2345678901bc',
  as: 'AS8075',
  name: 'Microsoft Corporation',
};

export const MOCK_ORGANIZATION_AMAZON: Organization = {
  id: 'c3d4e5f6-7890-12ab-cdef-3456789012cd',
  as: 'AS16509',
  name: 'Amazon.com, Inc.',
};

export const MOCK_ORGANIZATION_FACEBOOK: Organization = {
  id: 'd4e5f6g7-8901-23ab-cdef-4567890123de',
  as: 'AS32934',
  name: 'Facebook, Inc.',
};

export const MOCK_ORGANIZATION_APPLE: Organization = {
  id: 'e5f6g7h8-9012-34ab-cdef-5678901234ef',
  as: 'AS714',
  name: 'Apple Inc.',
};

export const MOCK_ORGANIZATION_NETFLIX: Organization = {
  id: 'f6g7h8i9-0123-45ab-cdef-6789012345fg',
  as: 'AS2906',
  name: 'Netflix, Inc.',
};

export const MOCK_ORGANIZATION_TWITTER: Organization = {
  id: 'g7h8i9j0-1234-56ab-cdef-7890123456gh',
  as: 'AS13414',
  name: 'Twitter, Inc.',
};

export const MOCK_ORGANIZATION_LINKEDIN: Organization = {
  id: 'h8i9j0k1-2345-67ab-cdef-8901234567hi',
  as: 'AS14413',
  name: 'LinkedIn Corporation',
};

export const MOCK_ORGANIZATION_SPOTIFY: Organization = {
  id: 'i9j0k1l2-3456-78ab-cdef-9012345678ij',
  as: 'AS8403',
  name: 'Spotify AB',
};

export const MOCK_ORGANIZATION_SALESFORCE: Organization = {
  id: 'j0k1l2m3-4567-89ab-cdef-0123456789jk',
  as: 'AS14340',
  name: 'Salesforce.com, Inc.',
};

export const MOCK_ORGANIZATION_UBER: Organization = {
  id: 'k1l2m3n4-5678-90ab-cdef-1234567890kl',
  as: 'AS63086',
  name: 'Uber Technologies, Inc.',
};

export const MOCK_ORGANIZATION_AIRBNB: Organization = {
  id: 'l2m3n4o5-6789-01ab-cdef-2345678901lm',
  as: 'AS396982',
  name: 'Airbnb, Inc.',
};

export const MOCK_ORGANIZATIONS: Organization[] = [
  MOCK_ORGANIZATION_SAP_SE,
  MOCK_ORGANIZATION_GOOGLE,
  MOCK_ORGANIZATION_MICROSOFT,
  MOCK_ORGANIZATION_AMAZON,
  MOCK_ORGANIZATION_FACEBOOK,
  MOCK_ORGANIZATION_APPLE,
  MOCK_ORGANIZATION_NETFLIX,
  MOCK_ORGANIZATION_TWITTER,
  MOCK_ORGANIZATION_LINKEDIN,
  MOCK_ORGANIZATION_SPOTIFY,
  MOCK_ORGANIZATION_SALESFORCE,
  MOCK_ORGANIZATION_UBER,
  MOCK_ORGANIZATION_AIRBNB,
];
