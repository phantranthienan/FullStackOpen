import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateBlogForm from './CreateBlogForm';

test('calls the event handler it received as props with the right details when a new blog is created', async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();

  render(<CreateBlogForm createBlog={createBlog} />);

  const titleInput = screen.getByLabelText(/title/i);
  const authorInput = screen.getByLabelText(/author/i);
  const urlInput = screen.getByLabelText(/url/i);
  const submitButton = screen.getByRole('button', { name: /create/i });

  await user.type(titleInput, 'Testing Blog Title');
  await user.type(authorInput, 'Testing Author');
  await user.type(urlInput, 'http://testing-url.com');
  await user.click(submitButton);

  expect(createBlog).toHaveBeenCalledTimes(1);
  expect(createBlog).toHaveBeenCalledWith({
    title: 'Testing Blog Title',
    author: 'Testing Author',
    url: 'http://testing-url.com',
  });
});