import React, { memo, useCallback } from 'react';

import { Handle } from 'react-flow-renderer';

import { onTokenShown } from '@/plugins/javascript';

import { run } from '@/server';

function stringValue(type, val) {
	return type === 'string' ? `"${val}"` : val;
}

function Node({ data, isConnectable }) {
	const { tokens, id, ref } = data;

	const runCode = useCallback(() => {
		const {
			ast: { start, end },
		} = data;
		run(start, end);
	}, []);

	return (
		<div className="bg-slate-50 rounded-md" key={id}>
			<p className=" absolute left-0 -translate-x-full text-xs">{ref}</p>
			<button
				type="button"
				className=" absolute right-0 translate-x-full text-xs"
				onClick={runCode}
			>
				run
			</button>
			{tokens.map((token) => {
				const { color, display } = onTokenShown(token);

				const {
					id: tokenId,
					value,
					isRef,
					isNodeRef,
					type: { label },
				} = token;

				return isRef && !isNodeRef ? (
					<Handle
						key={tokenId}
						type="target"
						id={tokenId}
						style={{
							position: 'relative',
							display: 'inline-block',
							width: 'auto',
							height: 'auto',
							left: 'auto',
							top: 'auto',
							transform: 'none',
							color,
							background: 'none',
							margin: '0 2px',
						}}
						isConnectable={isConnectable}
					>
						{value}
					</Handle>
				) : (
					<span
						key={tokenId}
						style={{ color, display, margin: '0 5px' }}
					>
						{stringValue(label, value) || label}
					</span>
				);
			})}
			<Handle
				key="source"
				type="source"
				position="bottom"
				style={{
					background: 'rgba(0,0,0,.4)',
					border: 'none',
					width: 3,
					height: 3,
				}}
				onConnect={(params) => console.log('handle onConnect', params)}
				isConnectable={isConnectable}
			/>
		</div>
	);
}

export default memo(Node);
