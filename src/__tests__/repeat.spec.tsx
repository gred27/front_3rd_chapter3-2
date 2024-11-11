import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement } from 'react';
import { describe, it, expect } from 'vitest';

import App from '../App';

const setup = (element: ReactElement) => {
  const user = userEvent.setup();

  return { ...render(<ChakraProvider>{element}</ChakraProvider>), user };
};
describe('반복일정 test >', () => {
  // default
  describe('default >', () => {
    it('반복 일정 클릭 시 하위 메뉴가 출력된다.', async () => {
      const { user } = setup(<App />);

      // 01. 초기 체크 여부 확인
      // 쿼링의 세가지 방법 : getByRole, getByText, getByTestId
      const checkbox = screen.getByRole('checkbox', { name: '반복 설정 반복 일정' });
      expect(checkbox).toBeChecked();

      // 02. 체크 -> 없는 거 확인
      await user.click(checkbox);
      // 반복 유형, 반복 간격, 반복 종료일 없는 지 테스트
      expect(checkbox).not.toBeChecked();
      expect(screen.queryByLabelText('반복 유형')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('반복 간격')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('반복 종료일')).not.toBeInTheDocument();

      // 03. 체크 -> 있는 거 확인
      await user.click(checkbox);
    });
  });

  // 1. 반복 유형 선택 테스트
  describe('반복 유형 선택', () => {
    it('반복유형 선택 옵션으로 매일, 매주, 매월, 매년이 존재한다.', () => {
      setup(<App />);
      // 반복 유형 옵션이 존재하는지 확인
      expect(screen.getByText(/매일/i)).toBeInTheDocument();
      expect(screen.getByText(/매주/i)).toBeInTheDocument();
      expect(screen.getByText(/매월/i)).toBeInTheDocument();
      expect(screen.getByText(/매년/i)).toBeInTheDocument();
    });

    it('사용자가 일정 생성 또는 수정 시 반복 유형을 선택할 수 있다.', async () => {
      const { user } = setup(<App />);

      await user.selectOptions(screen.getByRole('combobox', { name: '반복 유형' }), 'weekly');

      // 선택한 값이 '매주'인지 확인
      expect(screen.getByRole('combobox', { name: '반복 유형' })).toHaveValue('weekly');
    });
  });

  // 2. 반복 간격 설정 테스트
  describe('반복 간격 설정', () => {
    it('사용자가 반복 간격을 설정할 수 있다.', () => {});
  });

  // 3. 반복 일정 표시 테스트
  describe('반복 일정 표시', () => {
    it('캘린더 뷰에서 반복 일정을 아이콘으로 구분하여 표시한다.', () => {});
  });

  // 4. 반복 종료 조건 설정 테스트
  describe('반복 종료 조건 설정', () => {
    it('사용자가 특정 날짜까지 반복 일정을 설정할 수 있다.', () => {});

    it('사용자가 특정 횟수만큼 반복 일정을 설정할 수 있다.', () => {});
  });

  // 5. 반복 일정 단일 수정 테스트
  describe('반복 일정 단일 수정', () => {
    it('반복 일정을 수정하면 단일 일정으로 변경되고, 아이콘이 사라진다.', () => {});
  });

  // 6. 반복 일정 단일 삭제 테스트
  describe('반복 일정 단일 삭제', () => {
    it('반복 일정을 삭제하면 해당 일정만 삭제된다.', () => {});
  });

  // 7. 예외 날짜 처리 테스트
  describe('예외 날짜 처리', () => {
    it('사용자가 반복 일정 중 특정 날짜를 제외할 수 있다.', () => {});

    it('사용자가 반복 일정 중 특정 날짜의 일정을 수정할 수 있다.', () => {});
  });

  // 8. 요일 지정 테스트 (주간 반복)
  describe('요일 지정 (주간 반복)', () => {
    it('사용자가 주간 반복 시 특정 요일을 선택할 수 있다.', () => {});
  });

  // 9. 월간 반복 옵션 테스트
  describe('월간 반복 옵션', () => {
    it('사용자가 매월 특정 날짜에 반복되도록 설정할 수 있다.', () => {});

    it('사용자가 매월 특정 순서의 요일에 반복되도록 설정할 수 있다.', () => {});
  });

  // 10. 반복 일정 전체 수정 및 삭제 테스트
  describe('반복 일정 전체 수정 및 삭제', () => {
    it('사용자가 반복 일정의 모든 일정을 수정할 수 있다.', () => {});

    it('사용자가 반복 일정의 모든 일정을 삭제할 수 있다.', () => {});
  });
});
