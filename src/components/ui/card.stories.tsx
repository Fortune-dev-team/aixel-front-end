import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './card';
import { Button } from './button';

const meta = {
  title: "Molecules/Card",
  component: Card,
  tags: ['ai-generated'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="w-[350px]">
      <CardHeader>
        <CardTitle>Pretest kompetensi</CardTitle>
        <CardDescription>Petakan kemampuan awal tiap anggota tim.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Isi kartu evaluasi atau jalur belajar.</p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Mulai</Button>
      </CardFooter>
    </Card>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Pretest kompetensi')).toBeVisible();
    await expect(canvas.getByRole('button', { name: /mulai/i })).toBeVisible();
  },
};

export const SmallSize: Story = {
  render: () => (
    <Card size="sm" className="w-[300px]">
      <CardHeader>
        <CardTitle>Kartu Kecil</CardTitle>
        <CardDescription>Deskripsi ringkas</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Konten ukuran kecil.</p>
      </CardContent>
    </Card>
  ),
};
