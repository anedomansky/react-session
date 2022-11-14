import { render, screen, userEvent } from '../../utils/test-utils';
import SessionModalFooter from './SessionModalFooter';

describe('SessionModalFooter', () => {
  it('should render', () => {
    render(<SessionModalFooter text="Test" />);

    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Test').closest('div')).toHaveClass(
      'session-modal-footer'
    );
  });

  it('should render button', () => {
    render(<SessionModalFooter text="Test" />);

    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Test').closest('button')).toBeInTheDocument();
  });

  it('should trigger onClick', async () => {
    const testOnClick = () => {
      const testDiv = document.createElement('div');
      testDiv.textContent = 'testDiv';
      document.body.appendChild(testDiv);
    };

    render(<SessionModalFooter text="Test" onClick={testOnClick} />);

    await userEvent.click(screen.getByText('Test'));

    expect(screen.getByText('testDiv')).toBeInTheDocument();
  });
});
