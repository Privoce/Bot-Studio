# add project structure
mkdir "assets"
mkdir "build"
mkdir "components"
mkdir "example"
mkdir "hooks"
mkdir "layouts"
mkdir "lib"
mkdir "mocks"
mkdir "scripts"
mkdir "services"
mkdir "types"
mkdir "utils"

# add tailwindcss
# ref: https://tailwindcss.com/docs/guides/nextjs
yarn add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
printf "@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n" | cat - ./styles/globals.css > ./styles/tmp.css
rm ./styles/globals.css
mv ./styles/tmp.css ./styles/globals.css

# add commit lint tools
# ref: https://github.com/conventional-changelog/commitlint
yarn add -D @commitlint/{config-conventional,cli}
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
yarn add -D husky
yarn husky install
yarn husky add .husky/commit-msg  "npx --no -- commitlint --edit ${1}"
yarn husky add .husky/pre-commit "yarn tsc --noEmit && yarn eslint . && yarn prettier --write ."

# add dependencies
yarn add axios immer zustand @tanstack/react-query # state management
yarn add react-hook-form yup @hookform/resolvers # form
yarn add @floating-ui/react react-select @headlessui/react # ui
yarn add clsx dayjs # utils

# mswjs
yarn add msw
npx msw init public/

# eslint
yarn add -D prettier eslint-config-prettier eslint-plugin-prettier # prettier
yarn add -D eslint-plugin-react eslint-plugin-react-hooks
yarn add -D eslint-config-airbnb eslint-config-airbnb-typescript # airbnb
yarn add -D @typescript-eslint/parser @typescript-eslint/eslint-plugin # typescript
