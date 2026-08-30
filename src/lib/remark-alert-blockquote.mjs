import { visit } from 'unist-util-visit';

function getFirstText(node) {
  if (node.type === 'text') return node.value;
  if (node.children?.length) return getFirstText(node.children[0]);
  return '';
}

export function remarkAlertBlockquote() {
  return (tree) => {
    visit(tree, 'blockquote', (node) => {
      const firstParagraph = node.children?.[0];
      const firstChild = firstParagraph?.children?.[0];
      if (firstChild?.type === 'strong' && getFirstText(firstChild).startsWith('Alerta')) {
        node.data ??= {};
        node.data.hProperties ??= {};
        node.data.hProperties.className = ['alert'];
      }
    });
  };
}
