import React, { Ref, useCallback, useEffect, useRef, useState } from 'react';
import ClipboardJS from 'clipboard';

type CopyStates = 'copyable' | 'copied' | 'error';

export function useCopyToClipboard(
  copyText: string,
  copyTarget: string,
  config?: { copied?: string; copyable?: string; error?: string }
) {
  const [copyState, setCopyState] = useState<CopyStates>('copyable');
  const [clipboard, setClipboard] = useState<ClipboardJS>();

  const copyTextMap = {
    copied: config?.copied || 'Copied Successfully!',
    copyable: config?.copyable || 'Copy to clipboard',
    error: config?.error || 'Error copying, click to try again.'
  };

  useEffect(() => {
    if (clipboard) clipboard.destroy();

    const targetElements = document.querySelectorAll(copyTarget);
    if (targetElements.length) {
      targetElements.forEach(targetElement => targetElement.setAttribute('data-clipboard-text', copyText));
      const newClipboard = new ClipboardJS(targetElements);
      setClipboard(newClipboard);
    }

    return () => {
      if (clipboard) clipboard.destroy();
    };
  }, []);

  useEffect(() => {
    if (clipboard) {
      clipboard.on('success', e => {
        setCopyState('copied');
        setTimeout(() => setCopyState('copyable'), 1000);
        e.clearSelection();
      });

      clipboard.on('error', e => setCopyState('error'));
    }
  }, [clipboard]);

  return [copyTextMap[copyState], copyState];
}
