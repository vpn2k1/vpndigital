'use client';

import { Rocket } from 'lucide-react';
import { toast } from 'sonner';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { api } from './api';

export function PublishButton({ onPublished }: { onPublished: () => void }) {
  async function publish() {
    try { await api('publish', { method: 'POST' }); onPublished(); toast.success('Đã gửi yêu cầu build. Website cập nhật sau 1–3 phút.'); }
    catch (err) { toast.error((err as Error).message); }
  }
  return <AlertDialog>
    <AlertDialogTrigger asChild><Button><Rocket/> Publish</Button></AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader><AlertDialogTitle>Publish lên website?</AlertDialogTitle>
        <AlertDialogDescription>Website sẽ được build lại với dữ liệu hiện tại, mất khoảng 1–3 phút.</AlertDialogDescription></AlertDialogHeader>
      <AlertDialogFooter><AlertDialogCancel>Huỷ</AlertDialogCancel><AlertDialogAction onClick={publish}>Publish</AlertDialogAction></AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>;
}
