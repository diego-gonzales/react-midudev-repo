import { test, expect } from "@playwright/test";

const CAT_PREFIX_IMAGE_URL = "https://cataas.com";
const LOCAL_HOST_URL = "http://localhost:5173";

test("app shows a text and an image random", async ({ page }) => {
  await page.goto(LOCAL_HOST_URL);

  const text = await page.getByRole("paragraph");
  const image = await page.getByRole("img");

  const textContent = await text.textContent();
  const imageSrc = await image.getAttribute("src");
  // Expect a title "to contain" a substring.
  await expect(textContent?.length).toBeGreaterThan(0);
  await expect(imageSrc?.startsWith('hello')).toBeTruthy();
});
