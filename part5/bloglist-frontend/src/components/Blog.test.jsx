import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Blog from './Blog';
import { expect } from 'vitest';

test('renders title and author, but not URL or likes by default', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'www.testing-library.com',
    likes: 5,
    user: {
      username: 'testuser',
      name: 'Test User',
    },
  };

  const user = {
    username: 'testuser',
  };

  render(<Blog blog={blog} user={user} />);

  const titleAuthorDiv = screen.getByTestId('blog-title-author');
  expect(titleAuthorDiv).toBeDefined();

  const urlDiv = screen.queryByText('www.testing-library.com');
  expect(urlDiv).toBeNull();

  const likesDiv = screen.queryByText('likes 5');
  expect(likesDiv).toBeNull();
});

test('shows URL and number of likes when the button controlling the shown details has been clicked', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'www.testing-library.com',
    likes: 5,
    user: {
      username: 'testuser',
      name: 'Test User',
    },
  };

  const user = {
    username: 'testuser',
  };

  render(<Blog blog={blog} user={user} />);

  const button = screen.getByText('view');
  await userEvent.click(button);

  const urlDiv = screen.getByText('www.testing-library.com');
  expect(urlDiv).toBeDefined();

  const likesDiv = screen.getByText('likes 5');
  expect(likesDiv).toBeDefined();
});

test('calls the like button event handler twice when clicked twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'www.testing-library.com',
    likes: 5,
    user: {
      username: 'testuser',
      name: 'Test User',
    },
  };

  const user = {
    username: 'testuser',
  };

  const mockHandler = vi.fn();

  render(<Blog blog={blog} user={user} likeBlog={mockHandler} />);

  const button = screen.getByText('view');
  await userEvent.click(button);

  const likeButton = screen.getByTestId('like-button');
  await userEvent.click(likeButton);
  await userEvent.click(likeButton);

  expect(mockHandler).toHaveBeenCalledTimes(2);
});