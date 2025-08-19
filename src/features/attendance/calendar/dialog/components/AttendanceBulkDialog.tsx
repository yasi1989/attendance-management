import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Send, AlertTriangle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { formatDisplayYearMonth } from '../../lib/calendarUtils';

type AttendanceBulkDialogProps = {
  currentDate: Date;
  canSubmit: boolean;
};

const AttendanceBulkDialog = ({ currentDate, canSubmit }: AttendanceBulkDialogProps) => {
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitted(true);

    try {
      console.log('月次勤怠申請を提出:', {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
        comment,
      });

      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsSubmitDialogOpen(false);
      setComment('');
    } catch (error) {
      console.error('申請エラー:', error);
    } finally {
      setIsSubmitted(false);
    }
  };

  return (
    <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          disabled={!canSubmit}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 text-white shadow-sm hover:shadow-md hover:scale-105 focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2 dark:focus:ring-blue-400/40 transition-all duration-200 font-medium backdrop-blur-sm"
        >
          <Send className="h-4 w-4 mr-2" />
          月次申請
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg mx-4">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">月次勤怠申請</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            {formatDisplayYearMonth(currentDate)}の勤怠データを申請します。申請後は承認されるまで編集できません。
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="bg-white dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">申請コメント（任意）</Label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="申請に関するコメントや補足事項があれば入力してください...&#10;例：月次勤怠データを確認し、適切であることを確認しました。"
                className="min-h-[100px] resize-none border-slate-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all"
                maxLength={500}
                disabled={isSubmitted}
              />
            </div>

            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-slate-500 dark:text-slate-400">このコメントは月次勤怠申請に添付されます</p>
              <span className="text-xs text-slate-400 dark:text-slate-500">{comment.length}/500</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-amber-800 dark:text-amber-300 mb-1">重要な注意事項</h4>
                <ul className="text-xs text-amber-700 dark:text-amber-400 space-y-1">
                  <li>• 申請後は承認されるまで勤怠データの編集ができません</li>
                  <li>• 申請を取り消す場合は管理者にお問い合わせください</li>
                  <li>• 申請完了後、承認者にメール通知が送信されます</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsSubmitDialogOpen(false)}
            className="border-gray-300 dark:border-gray-600"
            disabled={isSubmitted}
          >
            キャンセル
          </Button>
          <Button
            onClick={handleSubmit}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            disabled={isSubmitted}
          >
            {isSubmitted ? (
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
            ) : (
              <Send className="h-4 w-4 mr-2" />
            )}
            申請する
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AttendanceBulkDialog;
