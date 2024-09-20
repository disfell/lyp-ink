# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## reinstall && run preview

```
rm -rf node_modules package-lock.json .output .nuxt && npm install && npm run build && npm run preview
```

## check version

```
npm outdated

npx npm-check-updates -u

npm update <package-name>
npm install
```

## 一些自定义组件的使用

### Alert 框

```
::MyAlert{type="warning"}
这里是内容
::
```

目前提供了四种颜色提示
- info
- warning
- danger
- success

### 粗字体

```
**这里是内容**{type="default"}
```