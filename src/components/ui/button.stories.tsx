import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Button } from './button';

const meta = {
  title: "Atoms/Button",
  component: Button,
  tags: ['ai-generated'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Click me' },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /click me/i })).toBeVisible();
  },
};

export const Secondary: Story = {
  args: { children: 'Secondary', variant: 'secondary' },
};

export const Outline: Story = {
  args: { children: 'Outline', variant: 'outline' },
};

export const Destructive: Story = {
  args: { children: 'Delete', variant: 'destructive' },
};

export const Small: Story = {
  args: { children: 'Small button', size: 'sm' },
};

export const Large: Story = {
  args: { children: 'Large button', size: 'lg' },
};

export const CssCheck: Story = {
  args: { children: 'Destructive Action', variant: 'destructive' },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /destructive action/i });
    // Destructive uses bg-red-600 which Tailwind v4 compiles to oklch(0.577 0.245 27.325)
    await expect(getComputedStyle(button).backgroundColor).toBe('oklch(0.577 0.245 27.325)');
  },
};
