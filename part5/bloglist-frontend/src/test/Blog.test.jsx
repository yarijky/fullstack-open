import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import Blog from "../components/Blog";

test("renders title", () => {
  const blog = {
    title: "This is my first blogpost",
    author: "Yari is my name",
    url: "I dont't have an url",
    likes: 10,
  };

  const mockHandler = vi.fn()

  const { container } = render(<Blog blog={blog} toggleImportance={mockHandler} />);

  // const user = userEvent.setup()
  // const button = screen.getByText('make not important')
  // await user.click(button)

  // expect(mockHandler.mock.calls).toHaveLength(1)

  const title = container.querySelector('.title')
  const author = container.querySelector('.author')
  const url = container.querySelector('.url')
  const likes = container.querySelector('.likes')

  expect(title).toHaveTextContent(blog.title);
  expect(author).toBeNull();
  expect(url).toBeNull();
  expect(likes).toBeNull();
});

test("renders title", () => {
  const blog = {
    title: "This is my first blogpost",
    author: "Yari is my name",
    url: "I dont't have an url",
    likes: 10,
  };

  // const mockHandler = vi.fn()

  const { container } = render(<Blog blog={blog} /*toggleImportance={mockHandler}*/ />);

  // const user = userEvent.setup()
  // const button = screen.getByText('show')
  // user.click(button)

  // // expect(mockHandler.mock.calls).toHaveLength(1)

  const title = container.querySelector('.title')
  const author = container.querySelector('.author')
  const url = container.querySelector('.url')
  const likes = container.querySelector('.likes')

  expect(title).toHaveTextContent(blog.title);
  expect(author).toHaveTextContent(blog.author);
  expect(url).toHaveTextContent(blog.url);
  expect(likes).toHaveTextContent(blog.likes);
});
