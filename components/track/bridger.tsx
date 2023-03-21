import { FC } from 'react';
import Script from 'next/script';

interface Props {}

const Index: FC<Props> = () => (
  <Script
    async
    id="bridger-sdk"
    type="text/javascript"
    src="https://static.bridger.chat/sdk/v0.2.2/widget.js"
    strategy="afterInteractive"
    onLoad={() => {
      // @ts-ignore
      Bridger.initWidget({
        id: '161089246870958080',
        zIndex: '9999',
        launcher: { boxShadow: 'none', bottom: '16px', right: '16px', borderRadius: '12px' },
        messenger: {
          width: '380px',
          height: '680px',
          bottom: '16px',
          right: '16px',
          borderRadius: '12px',
        },
      });
    }}
  />
);

export default Index;
