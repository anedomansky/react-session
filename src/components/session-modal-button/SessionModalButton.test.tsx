import { render, screen, userEvent } from '../../utils/test-utils';
import SessionModalButton from './SessionModalButton';

describe('SessionModalButton', () => {
  it('should render', () => {
    render(<SessionModalButton>Test</SessionModalButton>);

    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Test')).toHaveClass('session-modal-button');
  });

  it('should trigger onClick', async () => {
    const testOnClick = () => {
      const testDiv = document.createElement('div');
      testDiv.textContent = 'testDiv';
      document.body.appendChild(testDiv);
    };

    render(<SessionModalButton onClick={testOnClick}>Test</SessionModalButton>);

    await userEvent.click(screen.getByText('Test'));

    expect(screen.getByText('testDiv')).toBeInTheDocument();
  });
});
