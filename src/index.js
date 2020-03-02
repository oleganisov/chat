import '../assets/css/_styles.scss';
import { expand, maximize, close } from './js/controls';
import auth from './js/auth';
import file from './js/file';
import chat from './js/chat';

auth();
file();
chat();
expand();
maximize();
close();
