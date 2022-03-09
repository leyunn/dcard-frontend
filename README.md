# 2022 Web Frontend Intern Homework - GitHub REST API

- #### 程式架構設計 Code Skeleton

  使用Function架構及React hook，不使用Redux由於專案不大。

  將不同頁面分成不同compoment，並將重複部分獨立成util。

  - **Index**: program Entry
  - **App**: a universal tool bar for displaying  reponame/username + Home button
  - *components*
    - **Home**: a search page 
    - **Repo**: render information for a single repo 
    - **User**: render a repo list for a single user
  - *util*
    - **Loading**: loading effect when sending API request
    - **Notfound**: error page when API request failed

- #### 功能與實作 Features and implementation

  - 使用 react router dom 做routing

  - 使用 axios 串接GitHub REST API

  - 使用 react-infinite-scroll-component 來實作滾動載入

  - 使用 Material-UI 美化介面

  - 處理例外狀況：invalid url, non-existed user/repo, name too long...等

    

- #### 如何啟動 How to run at localhost

  clone repo

  ```
  git clone https://github.com/leyunn/dcard-frontend.git
  ```

  Install

  ```
  cd dcard-frontend
  npm install
  ```

  Now you can

  ```
  npm start
  //"dcard-frontend" is now running at localhost
  ```

