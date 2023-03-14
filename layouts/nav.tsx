import { FC } from 'react';
import NavItem from './nav-item';
import IconChat from '../assets/material/chat_FILL0_wght400_GRAD0_opsz20.svg';
import IconModel from '../assets/material/widgets_FILL0_wght400_GRAD0_opsz20.svg';
import IconOpenAI from '../assets/logo/openai.svg';
import IconSettings from '../assets/material/settings_FILL0_wght400_GRAD0_opsz20.svg';
import IconFolder from '../assets/material/folder_FILL0_wght400_GRAD0_opsz20.svg';
import IconTune from '../assets/material/tune_FILL0_wght400_GRAD0_opsz20.svg';

interface Props {}

const Index: FC<Props> = () => (
  <nav className="border-r flex flex-col w-60 h-full overflow-y-auto border-r-primary shrink-0 grow-0">
    <div className="text-theme-500 h-13 flex justify-center items-center">
      <IconOpenAI className="w-6 h-6" />
      <div className="pl-2 font-medium text-base">OpenAI Dashboard</div>
    </div>
    <NavItem href="/" text="Chat" icon={IconChat} />
    <NavItem href="/models" text="Models" icon={IconModel} />
    <NavItem href="/files" text="Files" icon={IconFolder} />
    <NavItem href="/fine-tunes" text="Fine tune" icon={IconTune} />
    <NavItem href="/settings" text="Settings" icon={IconSettings} />
    <div className="flex-1" />
    <div>Github</div>
  </nav>
);

export default Index;
