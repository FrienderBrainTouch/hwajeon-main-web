import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { historyApi, type CompanyHistoryItem, type CompanyHistoryRequest } from '@/api/admin/history';
import { DashboardHeader } from '@/components/admin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const emptyForm: CompanyHistoryRequest = { year: '', title: '', description: '' };

export default function AdminHistory() {
  const { user, logout } = useAuth();
  const [items, setItems] = useState<CompanyHistoryItem[]>([]);
  const [form, setForm] = useState<CompanyHistoryRequest>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await historyApi.list();
      setItems(res.data ?? []);
    } catch (e) {
      console.error(e);
      alert('연혁 목록을 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const startEdit = (item: CompanyHistoryItem) => {
    setEditingId(item.id);
    setForm({ year: item.year, title: item.title, description: item.description });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.year.trim() || !form.title.trim() || !form.description.trim()) {
      alert('연도, 제목, 설명을 모두 입력해주세요.');
      return;
    }
    setSaving(true);
    try {
      if (editingId != null) {
        await historyApi.update(editingId, form);
        alert('연혁이 수정되었습니다.');
      } else {
        await historyApi.create(form);
        alert('연혁이 추가되었습니다.');
      }
      resetForm();
      await load();
    } catch (err) {
      console.error(err);
      alert('저장에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('이 연혁을 삭제할까요?')) return;
    try {
      await historyApi.remove(id);
      if (editingId === id) resetForm();
      await load();
    } catch (err) {
      console.error(err);
      alert('삭제에 실패했습니다.');
    }
  };

  return (
    <div>
      <DashboardHeader user={user} onLogout={logout} />

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-gray-900">연혁 관리</h2>
          <Button variant="outline" className="sm:hidden" asChild>
            <Link to="/admin/dashboard">게시글</Link>
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-6 space-y-4 shadow-sm">
          <div className="text-sm font-medium text-gray-700">
            {editingId != null ? `연혁 수정 (#${editingId})` : '연혁 추가'}
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">연도 *</label>
            <Input
              value={form.year}
              onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
              placeholder="예: 2026"
              maxLength={16}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">제목 *</label>
            <Input
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="연혁 제목"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">설명 *</label>
            <textarea
              className="w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="연혁 설명"
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={saving}>
              {saving ? '저장 중…' : editingId != null ? '수정 저장' : '추가'}
            </Button>
            {editingId != null && (
              <Button type="button" variant="outline" onClick={resetForm}>
                취소
              </Button>
            )}
          </div>
        </form>

        <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b text-sm font-medium text-gray-700">연혁 목록</div>
          {loading ? (
            <div className="p-6 text-center text-gray-500">불러오는 중…</div>
          ) : items.length === 0 ? (
            <div className="p-6 text-center text-gray-500">등록된 연혁이 없습니다.</div>
          ) : (
            <ul className="divide-y">
              {items.map((item) => (
                <li key={item.id} className="p-4 flex flex-col sm:flex-row sm:items-start gap-3 justify-between">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-gray-900">
                      <span className="tabular-nums text-blue-700">{item.year}</span>
                      <span className="mx-2 text-gray-300">|</span>
                      {item.title}
                    </div>
                    <p className="mt-1 text-sm text-gray-600 whitespace-pre-wrap">{item.description}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button type="button" size="sm" variant="outline" onClick={() => startEdit(item)}>
                      수정
                    </Button>
                    <Button type="button" size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
                      삭제
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
