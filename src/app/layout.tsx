import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '業界・職種リアル比較ガイド | OpenWorkデータ使用',
  description: '就活・転職向け業界比較ガイド。OpenWorkの口コミデータをもとに年収・残業・休日・年収カーブを可視化。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="antialiased">{children}</body>
    </html>
  );
}
