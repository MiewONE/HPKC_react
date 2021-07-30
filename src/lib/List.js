import React, { useRef } from 'react';
import { useDndZone } from 'react-dnd-action';
import './List.css';

export function List({ items, onItemsChange, isHorizontal = false, listName }) {
    const listRef = useRef();
    useDndZone(
        listRef,
        {
            items,
        },
        ({ items: newItems }) => {
            onItemsChange(newItems);
        }
    );

    return (
        <ul className={isHorizontal ? 'list horizontal' : 'list'} ref={listRef}>
            {listName}
            {items.map((item) => (
                <li key={item.id}>
                    <span>{item.id}</span>
                    <span>{item.email}</span>
                </li>
            ))}
        </ul>
    );
}
