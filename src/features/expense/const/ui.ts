export const EXPENSE_UI = {
  PAGE: {
    TITLE: '経費申請',
    DESCRIPTION: '交通費、一般経費の申請及び管理ができます。',
    ADD_BUTTON_LABEL: '経費申請',
    INFO_SECTION: {
      TITLE: '経費申請管理',
      DESCRIPTION: '従業員の経費データを確認し、申請処理を行います',
    },
  },
  DIALOG: {
    SECTIONS: {
      BASIC_INFO: { TITLE: '基本情報' },
      ROUTE_INFO: { TITLE: '経路情報' },
      AMOUNT_RECEIPT: { TITLE: '金額・領収書' },
    },
    MESSAGES: {
      APPROVED_EDIT_DISABLED: 'この経費データは承認済みのため編集できません。',
      SUBMITTED_EDIT_DISABLED: 'この経費データは申請済みのため編集できません。',
      ADD_ROUTE: '経路を追加',
    },
  },
} as const;
