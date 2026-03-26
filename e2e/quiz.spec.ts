import { test, expect } from '@playwright/test';

test.describe('Viktoriini E2E testid', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('avab rakenduse ja kuvab avakuva', async ({ page }) => {
    await expect(page.getByText('Eesti statistika viktoriiin')).toBeVisible();
    await expect(page.getByTestId('start-button')).toBeVisible();
  });

  test('alustab viktoriini ja kuvab esimese küsimuse', async ({ page }) => {
    await page.getByTestId('start-button').click();
    await expect(page.getByText('Küsimus 1/')).toBeVisible();
    await expect(page.getByTestId('option-0')).toBeVisible();
  });

  test('õige vastuse korral kuvatakse positiivne tagasiside ja skoor muutub', async ({
    page,
  }) => {
    await page.getByTestId('start-button').click();

    // Esimene küsimus — õige vastus on index 1 ("Umbes 1,37 miljonit")
    await page.getByTestId('option-1').click();

    // Kontrollime tagasisidet
    const feedback = page.getByTestId('feedback');
    await expect(feedback).toBeVisible();
    await expect(feedback).toContainText('Õige vastus');

    // Kontrollime, et skoor muutus
    await expect(page.getByTestId('current-score')).toContainText('1/1');
  });

  test('vale vastuse korral kuvatakse negatiivne tagasiside', async ({ page }) => {
    await page.getByTestId('start-button').click();

    // Valime teadlikult vale vastuse (index 0)
    await page.getByTestId('option-0').click();

    const feedback = page.getByTestId('feedback');
    await expect(feedback).toBeVisible();
    await expect(feedback).toContainText('Vale vastus');

    // Skoor ei kasva
    await expect(page.getByTestId('current-score')).toContainText('0/1');
  });

  test('vastab kõigile küsimustele ja kontrollib lõpptulemust', async ({ page }) => {
    await page.getByTestId('start-button').click();

    // Õiged vastused: 1, 2, 1, 2, 0
    const correctAnswers = [1, 2, 1, 2, 0];

    for (let i = 0; i < correctAnswers.length; i++) {
      await page.getByTestId(`option-${correctAnswers[i]}`).click();
      await expect(page.getByTestId('feedback')).toBeVisible();
      await page.getByTestId('next-button').click();
    }

    // Kontrolli lõpptulemust
    await expect(page.getByTestId('final-score')).toContainText('5/5');
    await expect(page.getByTestId('score-message')).toBeVisible();
    await expect(page.getByTestId('results-table')).toBeVisible();

    // Tabelis peaks olema 5 rida (+ päis)
    const rows = page.locator('.results__row');
    await expect(rows).toHaveCount(5);

    // Kõik vastused peaksid olema õiged
    const badges = page.locator('.results__badge--correct');
    await expect(badges).toHaveCount(5);
  });

  test('saab viktoriini uuesti alustada', async ({ page }) => {
    await page.getByTestId('start-button').click();

    // Vastame esimesele küsimusele kiiresti
    await page.getByTestId('option-0').click();
    await page.getByTestId('next-button').click();

    // Vastame ülejäänud küsimustele
    for (let i = 1; i < 5; i++) {
      await page.getByTestId('option-0').click();
      await page.getByTestId('next-button').click();
    }

    // Oleme tulemuste lehel
    await expect(page.getByTestId('final-score')).toBeVisible();

    // Klikime "Proovi uuesti"
    await page.getByTestId('restart-button').click();

    // Peaks tagasi avakuval olema
    await expect(page.getByTestId('start-button')).toBeVisible();
  });

  test('segatud õigete ja valede vastustega tulemus', async ({ page }) => {
    await page.getByTestId('start-button').click();

    // Vastame: õige, vale, õige, vale, vale
    const answers = [1, 0, 1, 0, 2];
    for (let i = 0; i < answers.length; i++) {
      await page.getByTestId(`option-${answers[i]}`).click();
      await page.getByTestId('next-button').click();
    }

    // Skoor peaks olema 2/5
    await expect(page.getByTestId('final-score')).toContainText('2/5');

    // Kontrollime, et tabelis on nii õigeid kui valesid
    const correct = page.locator('.results__badge--correct');
    const wrong = page.locator('.results__badge--wrong');
    await expect(correct).toHaveCount(2);
    await expect(wrong).toHaveCount(3);
  });
});
