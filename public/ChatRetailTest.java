package com.example.seleniumtest;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class ChatRetailTest {

    static String myUserName = "wt@gmail.com";
    static String myPassword = "Sutd12345!";

    public static void main(String[] args) throws InterruptedException {

        //System.setProperty("webdriver.gecko.driver","/Users/apple/Desktop/chromedriver");
        //WebDriver driver = new FirefoxDriver();
        System.setProperty("webdriver.chrome.driver","/Users/apple/Desktop/chromedriver");
        WebDriver driver = new ChromeDriver();

        driver.get("http://localhost:8887/");

        // get the user name field of the account page
        WebElement username = driver.findElement(By.id("username"));

        Thread.sleep(2000);

        // send my user name to fill up the box
        username.sendKeys(myUserName);

        Thread.sleep(2000);

        // locate the "Next" button in the account page
        WebElement password = driver.findElement(By.id("password"));

        //write password
        password.sendKeys(myPassword);

        Thread.sleep(2000);

        // login and :)
        WebElement nextButton = driver.findElement(By.id("loginbutton"));
        nextButton.click();

        Thread.sleep(2000);

        try {
            WebDriverWait wait = new WebDriverWait(driver, 10);
            // wait only until the project front page loads  dropbtn
            wait.until(ExpectedConditions.elementToBeClickable(By.className("dropbtn")));
            WebElement dropbtn = driver.findElement(By.className("dropbtn"));
            Thread.sleep(10000);
            dropbtn.click();
            Thread.sleep(3000);
            WebElement finance= driver.findElement(By.linkText("Retail"));
            finance.click();

            // click project link
            Thread.sleep(4000);
            WebElement typebar = driver.findElement(By.id("typeBar"));
            typebar.sendKeys("Hiiiiiii");
            Thread.sleep(2000);
            driver.findElement(By.cssSelector("i[class='fas fa-location-arrow']")).click();
            Thread.sleep(2000);
            typebar.sendKeys("i'm requesting Retail-related service");
            Thread.sleep(2000);
            driver.findElement(By.cssSelector("i[class='fas fa-location-arrow']")).click();

        } catch (Exception NoSuchElementException) {
            System.out.println("login/password name invalid");
        }
    }
}
