import { test } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("test app", async ({ page }) => {
  const email = faker.internet.email();

  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "X" }).click();
  await page.getByRole("button", { name: "Shop Now" }).click();
  await page.waitForURL("**/products");
  await page.getByRole("link", { name: "Login" }).click();
  await page.getByRole("link", { name: "Register" }).click();
  await page.waitForURL("**/register");
  await page.getByPlaceholder("Enter your name").click();
  await page.getByPlaceholder("Enter your name").fill("Name");
  await page.getByPlaceholder("Enter your email").click();
  await page.getByPlaceholder("Enter your email").fill(email);
  await page.getByPlaceholder("Enter your password").click();
  await page.getByPlaceholder("Enter your password").fill("12345678");
  await page.getByRole("button", { name: "Create account" }).click();
  await page.waitForURL("**/login");
  await page.getByPlaceholder("Enter your email").click();
  await page.getByPlaceholder("Enter your email").fill(email);
  await page.getByPlaceholder("Enter your password").click();
  await page.getByPlaceholder("Enter your password").fill("12345678");
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForURL("**/");
  await page.getByRole("button", { name: "Shop Now" }).click();
  await page.waitForURL("**/products");

  await page
    .locator("div")
    .filter({ hasText: /^\$39\.99Add to Cart$/ })
    .getByRole("button")
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^\$14\.99Add to Cart$/ })
    .getByRole("button")
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^\$49\.99Add to Cart$/ })
    .getByRole("button")
    .click();

  await page
    .locator("div")
    .filter({ hasText: /^\$14\.991$/ })
    .getByRole("button")
    .nth(1)
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^2$/ })
    .getByRole("button")
    .nth(1)
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^\$39\.991$/ })
    .getByRole("button")
    .nth(1)
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^3$/ })
    .getByRole("button")
    .first()
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^1$/ })
    .getByRole("button")
    .nth(2)
    .click();

  await page.getByRole("link", { name: "Cart" }).click();
  await page.waitForURL("**/cart");
  await page
    .locator("div")
    .filter({ hasText: /^Unisex Zip Hoodie\$39\.992$/ })
    .getByRole("button")
    .nth(1)
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^2$/ })
    .getByRole("button")
    .first()
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^3$/ })
    .getByRole("button")
    .nth(2)
    .click();

  await page.getByRole("button", { name: "N" }).click();
  await page.getByRole("link", { name: "Account ⇧⌘P" }).click();
  await page.getByLabel("Name").click();
  await page.getByLabel("Name").fill("fakertest");
  await page.getByRole("button", { name: "Update Profile" }).click();
  await page.getByLabel("New Password").click();
  await page.getByLabel("New Password").fill("123456789");
  await page.getByLabel("Confirm Password").click();
  await page.getByLabel("Confirm Password").fill("123456789");
  await page.getByRole("button", { name: "Change Password" }).click();
  await page.getByRole("link", { name: "Eshop" }).click();
});
