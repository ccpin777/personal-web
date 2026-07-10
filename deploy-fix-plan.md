# Deploy 修復計畫 — 停用 Netlify，改用 GitHub Pages + 自訂網域

## 背景

- `chuanpinchen.com` 目前由 Netlify 託管，Netlify 與 GitHub repo (`personal-web`) 的自動連動從 Session 4（git 歷史重寫、branch 改名為 main）後就斷了，導致每次 push 只更新 `yanxiee.github.io/personal-web/`，Netlify 端沒收到新的 commit。
- 也有可能是 Netlify 免費方案的 build minutes / bandwidth 額度用完（待確認，需登入 Netlify 後台的 Usage & billing 頁面查看）。
- 詳細記錄見 `dev-log.md` Session 9（2026-06-08）。

## 提議方案

不再修 Netlify，改成：**GitHub Pages 直接掛上 `chuanpinchen.com` 這個自訂網域**，這樣網址顯示還是自己的網域，但實際內容來自 GitHub Pages（跟 `yanxiee.github.io/personal-web/` 同步、永遠是最新版）。

## 待執行步驟

### 1. GitHub 端
- 進 repo `YanXiee/personal-web` → Settings → Pages
- Custom domain 欄位填入 `chuanpinchen.com`，儲存
  - GitHub 會自動在 repo 根目錄建立 `CNAME` 檔案（內容為 `chuanpinchen.com`）
- 等 DNS 生效後，勾選 **Enforce HTTPS**

### 2. DNS 端（在網域註冊商 / DNS 供應商後台設定）
- 需要先知道 `chuanpinchen.com` 的 DNS 是在哪裡管理的（可能還是連著 Netlify DNS，也可能在原本的註冊商）
- Apex domain (`chuanpinchen.com`，沒有 www) 設定 **A 記錄**，指向 GitHub Pages 的四個 IP：
  ```
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153
  ```
- 如果之後想要 `www.chuanpinchen.com` 也能用，額外設定 **CNAME 記錄**：`www` → `yanxiee.github.io`

### 3. 等待生效
- DNS 生效通常幾分鐘到 48 小時不等
- 生效後用 `curl -sI https://chuanpinchen.com` 確認 `server` header 變成 GitHub 相關（而不是 `Netlify`）

### 4. 收尾
- 確認 `chuanpinchen.com` 顯示內容跟 `index.html` 一致
- 到 Netlify 後台把舊的 `chuanpinchen.com` site 移除或停用，避免混淆或繼續產生費用

## 注意事項（上次的坑）

- 上次（Session 9）曾經加過 `CNAME` 檔案，但因為 DNS 沒配合設定好，導致 `yanxiee.github.io/personal-web/` 被重新導向到當時壞掉的 `chuanpinchen.com`，後來把 CNAME 移除了。
- 這次要**先確認 DNS 設定好、網站能正常打開之後**，再讓 GitHub 產生/保留 CNAME 檔案，避免重演一樣的問題。
- 目前這個環境（Claude Code）沒有 Netlify 或 DNS 供應商的登入權限，第 1、2 步需要 Pin（或帳號持有人）手動在對應後台操作。

## 狀態

- [ ] 確認 DNS 供應商是誰、目前 apex domain 設定為何
- [ ] GitHub Pages 加上 custom domain
- [ ] DNS 設定 A 記錄
- [ ] 驗證 `chuanpinchen.com` 顯示最新內容
- [ ] 停用/移除 Netlify site
