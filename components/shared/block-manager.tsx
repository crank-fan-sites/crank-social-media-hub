import Hero from '../blocks/hero';

const getBlockComponent = (
  { __component, ...rest }: { __component: any },
  index: number
) => {
  let Block;

  switch (__component) {
    case 'blocks.hero':
      Block = Hero;
      break;
  }

  // @ts-ignore
  return Block ? <Block key={`index-${index}`} {...rest} /> : null;
};

const BlockManager = ({ blocks }: { blocks: any }) => {
  return <div>{blocks.map(getBlockComponent)}</div>;
};

BlockManager.defaultProps = {
  blocks: [],
};

export default BlockManager;
