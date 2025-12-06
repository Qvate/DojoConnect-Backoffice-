import request from "supertest";

// Import the mock execute function so we can control its behavior in our tests.
import { createDbServiceSpies } from "../tests/spies/db.service.spies";
import { buildDojoMock } from "../tests/factories/dojos.factory";

import app from "../app";
// Tell Jest to use our manual mock for the db.service.
jest.mock("../services/db.service");

describe("Dojo Routes", () => {
  let mockExecute: jest.Mock;

  beforeEach(() => {
    const dbServiceSpy = createDbServiceSpies();

    mockExecute = dbServiceSpy.mockExecute;
  });

  afterEach(() => {
    // Clear mock history after each test.
    mockExecute.mockClear();
  });

  describe("GET /api/dojos/slug/:slug", () => {
    it("should return a 200 status and the dojo data if the slug exists", async () => {
      // Arrange: Mock the database response for a found dojo
      const mockDojo = buildDojoMock({
        id: 1,
        name: "Test Dojo",
        dojo_tag: "test-dojo",
        description: "A dojo for testing.",
      });

      mockExecute.mockResolvedValue([[mockDojo]]);

      // Act: Make the API request
      const response = await request(app).get("/api/dojos/slug/test-dojo");

      // Assert: Check the response
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        ...mockDojo,
        created_at: mockDojo.created_at.toISOString(),
      });
      expect(mockExecute).toHaveBeenCalledWith(
        expect.stringContaining("WHERE dojo_tag = ?"), // Check for the correct query
        ["test-dojo"] // Check for the correct parameter
      );
    });

    it("should return a 404 status if the slug does not exist", async () => {
      // Arrange: Mock the database to return no results
      mockExecute.mockResolvedValue([[]]); // Empty array signifies "not found"

      // Act & Assert
      await request(app).get("/api/dojos/slug/non-existent-dojo").expect(404);
    });
  });
});
