import React, { FC } from 'react';
import Script from 'next/script';

interface Props {
  tagId: string;
}

const Index: FC<Props> = ({ tagId }) => (
  <>
    <Script
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=${tagId}`}
    />
    <Script
      id="google-analytics"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${tagId}');
        `,
      }}
    />
  </>
);

export default Index;
