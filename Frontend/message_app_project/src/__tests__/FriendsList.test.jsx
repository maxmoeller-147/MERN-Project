import { FriendList } from "../components/FriendsList";
import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react"
import { FriendUser } from "../components/FriendUser";

vi.mock("../components/FriendList", () => ({
  FriendUser: ({ friend }) => (
    <div data-testid="friend-user">{friend.name}</div>
  )
}));

describe("FriendList", () => {
  test("Show message if it's empty", () => {
    render(<FriendList friends={[]} currentUserId="1"/>);
    expect(screen.getByText(/you have no friends yet/i)).toBeInTheDocument();
  });
});

