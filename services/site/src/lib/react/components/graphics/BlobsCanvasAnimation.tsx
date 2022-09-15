import { useCallback, useEffect, useRef, useState } from 'react';

import { css, useTheme } from '@emotion/react';

import { useResizeObserver } from '../../hooks/dom';
import { useReducedMotionPreference } from '../../hooks/motion';

import type { ComponentPropsWithoutRef } from 'react';
import type { CSSExtra } from '../../../common/types';

type Vector2D = [x: number, y: number];

const getOffset = (degrees: number, magnitude = 1) => {
	const angle = (degrees * Math.PI) / 180;

	const x = magnitude * Math.cos(angle);
	const y = magnitude * Math.sin(angle);

	return [x, y] as Vector2D;
};

class AnimationStateController {
	static readonly CIRCLE = (4 * (Math.sqrt(2) - 1)) / 3;

	circle = AnimationStateController.CIRCLE;
	count: number;
	fillStyle?: string;
	centerOffset: Vector2D;

	constructor(timeOffset?: number, centerOffset?: Vector2D, fillStyle?: string) {
		this.count = timeOffset ?? 0;
		this.centerOffset = centerOffset ?? [0, 0];
		this.fillStyle = fillStyle;
	}

	draw(context: CanvasRenderingContext2D, size: number) {
		const r = size / 2;
		const offsetX = (r * Math.sin(this.count)) / 200;
		const offsetY = (r * Math.cos(this.count * 2)) / 200;

		this.count += 0.005;

		const center = size / 2;

		context.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
		context.translate(center, center); // Move origin to center
		context.rotate(this.count / 20); // Rotate about origin (orbit)
		context.translate(r * this.centerOffset[0], r * this.centerOffset[1]); // Move origin to axis
		context.scale(0.8, 0.8); // Scale to contain entity w/n canvas
		context.rotate(this.count / 10); // Rotate about axis

		const path = new Path2D();

		// Mutate top right
		let circle = AnimationStateController.CIRCLE + 0.2 * Math.sin(this.count);
		path.moveTo(offsetX, offsetY - r);
		path.bezierCurveTo(
			offsetX + circle * r,
			offsetY - r,
			offsetX + r,
			offsetY - circle * r,
			offsetX + r,
			offsetY + 0,
		);

		// Mutate bottom right
		circle = AnimationStateController.CIRCLE + 0.2 * Math.cos(this.count);
		path.bezierCurveTo(
			offsetX + r,
			offsetY + circle * r,
			offsetX + circle * r,
			offsetY + r,
			offsetX + 0,
			offsetY + r,
		);

		// Mutate bottom left
		circle = AnimationStateController.CIRCLE + 0.2 * Math.sin(this.count * 2);
		path.bezierCurveTo(
			offsetX - circle * r,
			offsetY + r,
			offsetX - r,
			offsetY + circle * r,
			offsetX - r,
			offsetY + 0,
		);

		// Mutate top left
		circle = AnimationStateController.CIRCLE + 0.2 * Math.cos(this.count + 2);
		path.bezierCurveTo(
			offsetX - r,
			offsetY - circle * r,
			offsetX - circle * r,
			offsetY - r,
			offsetX + 0,
			offsetY - r,
		);

		if (this.fillStyle) {
			// eslint-disable-next-line no-param-reassign
			context.fillStyle = this.fillStyle;
		}
		context.fill(path);
	}
}

interface Props {
	orbitRadius?: number;
	cssExtra?: CSSExtra;
	containerProps?: ComponentPropsWithoutRef<'div'>;
	canvasProps?: ComponentPropsWithoutRef<'canvas'>;
}

export default function BlobsCanvasAnimation(props: Props) {
	const { orbitRadius = 0.0625, cssExtra, canvasProps, containerProps } = props;

	const theme = useTheme();

	const containerRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const randomRef = useRef(Math.random());
	const initialDrawRef = useRef(false);
	const frameRef = useRef<number>();

	const animationController1 = useRef(new AnimationStateController(randomRef.current, getOffset(120, orbitRadius)));
	const animationController2 = useRef(
		new AnimationStateController(randomRef.current + 1.5, getOffset(240, orbitRadius)),
	);
	const animationController3 = useRef(
		new AnimationStateController(randomRef.current + 2.5, getOffset(0, orbitRadius)),
	);

	// Update fill styles on theme change
	animationController2.current.fillStyle = theme.colors.accent.blobG;
	animationController1.current.fillStyle = theme.colors.accent.blobR;
	animationController3.current.fillStyle = theme.colors.accent.blobB;

	const [canvasSize, setCanvasSize] = useState(1000);

	const handleResize = useCallback(([entry]: ResizeObserverEntry[]) => {
		const canvas = canvasRef.current;
		const context = canvas?.getContext('2d');
		if (!context) return;

		const dpr = entry.devicePixelContentBoxSize[0];

		const size = Math.min(dpr.blockSize, dpr.inlineSize);

		setCanvasSize(size);
	}, []);
	useResizeObserver(handleResize, containerRef);

	const prefersReducedMotion = useReducedMotionPreference();

	// Update the canvas
	const tick = useCallback(() => {
		const canvas = canvasRef.current;
		const context = canvas?.getContext('2d');
		if (!context) return;

		context.setTransform(1, 0, 0, 1, 0, 0);
		context.clearRect(0, 0, canvasSize, canvasSize);
		context.globalCompositeOperation = 'screen';

		animationController1.current.draw(context, canvasSize);
		animationController2.current.draw(context, canvasSize);
		animationController3.current.draw(context, canvasSize);

		if (!prefersReducedMotion) {
			frameRef.current = requestAnimationFrame(tick);
		}

		initialDrawRef.current = true;
	}, [canvasSize, prefersReducedMotion]);

	// Start the animation upon mount (and cancel previous animation frame request on resize)
	// ...animation conditional on reduced motion preference for accessibility
	useEffect(() => {
		if (frameRef.current !== undefined) {
			cancelAnimationFrame(frameRef.current);
			frameRef.current = undefined;
		}

		frameRef.current = requestAnimationFrame(tick);
	}, [tick]);

	return (
		<div
			ref={containerRef}
			css={[
				// Ensure that the canvas does not scale to 0
				css`
					min-width: 1px;
				`,
				cssExtra,
			]}
			{...containerProps}
		>
			<canvas
				ref={canvasRef}
				css={css`
					display: block;
				`}
				{...canvasProps}
				height={canvasSize}
				width={canvasSize}
			/>
		</div>
	);
}
