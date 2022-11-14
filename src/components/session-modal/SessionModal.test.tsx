import { render, screen, userEvent } from '../../utils/test-utils';
import SessionModal from './SessionModal';

describe('SessionModal', () => {
  it('should render', () => {
    render(<SessionModal>Test</SessionModal>);

    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Test').closest('dialog')).toHaveClass(
      'session-modal'
    );
  });

  it('should show dialog', () => {
    render(<SessionModal show>Test</SessionModal>);

    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Test').closest('dialog')).toBeVisible();
  });
});
