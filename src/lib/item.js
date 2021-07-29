import { useDrag, useDrop } from 'react-dnd';

const ITEM_TYPE = '어떤컴포넌트';

export default function SomeComponent({ idx, move }) {
    const [{ isDragging }, drag] = useDrag({
        item: { type: ITEM_TYPE, idx },

        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end: (item) => {
            console.log(`${idx} 가 여기로 옮겨 졌어요 ${item.idx}`);
        },
    });

    const [, drop] = useDrop({
        accept: ITEM_TYPE,
        hover: (item) => {
            if (item.idx === idx) {
                return null;
            }
            move(item.idx, idx);
            item.idx = idx;
        },
    });
    return <div ref={(node) => drag(drop(node))} />;
}
