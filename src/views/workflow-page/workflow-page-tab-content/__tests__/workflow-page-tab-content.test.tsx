import React from 'react';

import { render } from '@/test-utils/rtl';

import { mockWorkflowPageTabsConfig } from '../../__fixtures__/workflow-page-tabs-config';
import WorkflowPageTabContent from '../workflow-page-tab-content';
import type { WorkflowPageTabContentProps } from '../workflow-page-tab-content.types';

jest.mock(
  '../../config/workflow-page-tabs.config',
  () => mockWorkflowPageTabsConfig
);

const paramsObject: WorkflowPageTabContentProps['params'] = {
  cluster: 'example-cluster',
  domain: 'example-domain',
  runId: 'example-runId',
  workflowId: 'example-workflowId',
  workflowTab: 'summary',
};

// TODO: Replace with proper React Testing Library approach
// Currently using mocking as a temporary workaround while investigating
// proper testing patterns for React 19's use() hook with this specific component setup
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  use: jest.fn(),
}));

const mockUse = React.use as jest.MockedFunction<typeof React.use>;

describe('WorkflowPageTabContent', () => {
  beforeEach(() => {
    mockUse.mockClear();
  });

  it('renders tab content with correct params when workflowTab exists in config', () => {
    // Mock use() to return resolved params directly
    mockUse.mockReturnValue(paramsObject);

    const params = Promise.resolve(paramsObject);
    const { getByText } = render(<WorkflowPageTabContent params={params} />);

    expect(getByText(JSON.stringify(paramsObject))).toBeInTheDocument();
    expect(mockUse).toHaveBeenCalledWith(params);
  });

  it('does not return any tab content if workflowTab is not present in the config', () => {
    const paramsWithoutTabContent = {
      ...paramsObject,
      workflowTab: 'unknown-tab',
    };
    mockUse.mockReturnValue(paramsWithoutTabContent);

    const params = Promise.resolve(paramsWithoutTabContent);
    const { container } = render(
      // @ts-expect-error allow passing unknown workflowtab to test receiving wrong value as a param
      <WorkflowPageTabContent params={params} />
    );

    expect(container.firstChild?.textContent).toBe('');
    expect(mockUse).toHaveBeenCalledWith(params);
  });
});
