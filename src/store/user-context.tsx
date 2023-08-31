import React, { useEffect, useRef, useState } from 'react';
import { supabase } from '../supabaseClient';
import { format } from 'date-fns';
import { formatDistance } from 'date-fns/fp';
import { Game } from './game-context';

export interface User {
  averageGuessTime: number;
  averageTakes: number;
  createdAt: Date;
  curCorrectLetters: string;
  gamesWon: number;
  hasPlayedToday: boolean;
  isOnStreak: boolean;
  leastTakes: number;
  lives: number;
  streak: number;
  id: number;
  hasStartedToday: boolean;
  lastPlayed: string;
  hintUsedToday: boolean;
  timeStartedToday: Date;
}

export type ContextDefaults = {
  user: User | undefined,
  setUserHasPlayedToday: Function;
  setUserLives: Function;
  setUserCorrectLetters: Function;
  setUserHasWon: Function;
  setUserStreak: Function;
  breakUserStreak: Function;
  resetUserOnNewGame: Function;
  setAvTakes: Function;
  setLeastTakes: Function;
  setUserGuessForToday: Function;
};

const contextDefaults = {
  user: undefined,
  setUserHasPlayedToday: async () => {
  },
  setUserLives: async (curLives: number) => {
  },
  setUserCorrectLetters: async (correctLetters: string) => {
  },
  setUserHasWon: async () => {
  },
  setUserStreak: async () => {
  },
  breakUserStreak: async () => {
  },
  resetUserOnNewGame: async () => {
  },
  setAvTakes: async () => {
  },
  setLeastTakes: async () => {
  },
  setUserGuessForToday: async () => {
  }
};

export const UserContext =
  React.createContext<ContextDefaults>(contextDefaults);

type Props = {
  children: React.ReactNode;
};

export const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const userRef = useRef<User>();
  userRef.current = user;

  // TODO handle all supabase errors!
  const setUserHasPlayedToday = async (game: Game) => {
    if (!userRef.current) return;

    const { data: userData, error: userError } = await supabase.from('user').update({
      has_played_today: true,
      has_started_today: false,
      average_guess_time: formatDistance(new Date(userRef.current?.timeStartedToday), new Date())
    }).eq('user_id', userRef.current?.id).select();

    if (!userData) return;

    const { error: numTakesError } = await supabase.from('num_takes').insert({
      user_id: userRef.current?.id,
      game_id: game.gameId,
      num_takes: 5 - userData[0].lives
    });

    if (userError || numTakesError) {
      console.log('Something went wrong!');
      return;
    }
  };

  const setUserLives = async (curLives: number, isHint: boolean = false) => {
    const { error } = await supabase.from('user').update({
      lives: curLives,
      hint_used_today: isHint
    }).eq('user_id', userRef.current?.id);

    if (error) {
      console.log(error);
      return;
    }
  };

  const setUserCorrectLetters = async (correctLetters: string) => {
    const { error } = await supabase.from('user').update({ cur_correct_letters: correctLetters }).eq('user_id', userRef.current?.id);

    if (error) {
      console.log(error);
      return;
    }
  };

  const setUserHasWon = async () => {
    if (!userRef.current) return;

    const { error } = await supabase.from('user').update({ games_won: userRef.current.gamesWon + 1 }).eq('user_id', userRef.current?.id);

    if (error) {
      console.log(error);
      return;
    }
  };

  const setUserStreak = async () => {
    if (!userRef.current) return;

    const { error } = await supabase.from('user').update({
      streak: userRef.current.streak + 1,
      is_on_streak: true
    }).eq('user_id', userRef.current?.id);

    if (error) {
      console.log(error);
      return;
    }
  };

  const setLeastTakes = async (leastTakes: number) => {
    if (!userRef.current) return;

    const { error } = await supabase.from('user').update({
      least_takes: leastTakes
    }).eq('user_id', userRef.current?.id);

    if (error) {
      console.log(error);
      return;
    }
  };

  const setAvTakes = async (avTakes: number) => {
    if (!userRef.current) return;

    const { error } = await supabase.from('user').update({
      average_takes: avTakes
    }).eq('user_id', userRef.current?.id);

    if (error) {
      console.log(error);
      return;
    }
  };

  const setUserGuessForToday = async (guess: string, lives: number, game: Game) => {
    if (!userRef.current) return;

    let curGuess: string | null;

    console.log(lives);

    switch (lives) {
      case 5:
        curGuess = 'guess_one';
        break;
      case 4:
        curGuess = 'guess_two';
        break;
      case 3:
        curGuess = 'guess_three';
        break;
      case 2:
        curGuess = 'guess_four';
        break;
      case 1:
        curGuess = 'guess_five';
        break;
      default:
        curGuess = null;
        break;
    }

    if (!curGuess) return;

    console.log(curGuess);


    if (curGuess === 'guess_one') {
      const { error } = await supabase.from('guess').insert({
        [curGuess]: guess,
        user_id: userRef.current?.id,
        game_id: game.gameId
      });


      if (error) {
        console.log(error);
        return;
      }
    } else {
      console.log(game);
      const { data, error } = await supabase.from('guess').update({
        [curGuess]: guess
      }).eq('game_id', game.gameId).select();

      console.log(data);

      if (error) {
        console.log(error);
        return;
      }
    }
  };

  const breakUserStreak = async () => {
    if (!userRef.current) return;

    const { error } = await supabase.from('user').update({
      streak: 0,
      is_on_streak: false
    }).eq('user_id', userRef.current?.id);

    if (error) {
      console.log(error);
      return;
    }
  };

  const resetUserOnNewGame = async () => {
    if (!userRef.current) return;
    const { data, error } = await supabase.from('user').update({
      lives: 5,
      has_played_today: false,
      cur_correct_letters: '',
      has_started_today: true,
      time_started_today: new Date(),
      hint_used_today: false,
      last_played: format(new Date(), 'dd-MM-yyyy')
    }).eq('user_id', userRef.current?.id).select();


    if (error) {
      console.log(error);
      return;
    }

    const {
      cur_correct_letters: curCorrectLetters,
      has_played_today: hasPlayedToday,
      lives,
      has_started_today: hasStartedToday,
      last_played: lastPlayed,
      hint_used_today, hintUsedToday
    } = data[0];

    setUser(prevState => {
      return {
        ...prevState,
        curCorrectLetters,
        hasPlayedToday,
        lives,
        hasStartedToday,
        lastPlayed,
        hintUsedToday
      } as User;
    });
  };

  useEffect(() => {
    // Check local storage to see if user is new
    const userId = localStorage.getItem('userId');

    // if no id saved in local storage, initiate user
    if (!userId) {
      console.log('Welcome, new user!');

      const createUser = async () => {
        const { data, error } = await supabase.from('user').insert({ created_at: new Date() }).select();

        if (!data || error) {
          console.log(error?.message);
          return;
        }

        localStorage.setItem('userId', data[0].user_id);
      };

      createUser();

    } // if user has id saved in local storage, find user in database and load in
    else {
      const fetchUser = async () => {
        const { data, error } = await supabase.from('user').select().eq('user_id', userId);
        // TODO if userId but no data in DB, account no longer exists (error?), create a new one
        if (!data?.length) {
          return;
        }

        // else load the user into the program
        const {
          user_id: uid,
          created_at: createdAt,
          cur_correct_letters: curCorrectLetters,
          games_won: gamesWon,
          has_played_today: hasPlayedToday,
          is_on_streak: isOnStreak,
          least_takes: leastTakes,
          lives,
          streak,
          has_started_today: hasStartedToday,
          average_guess_time: averageGuessTime,
          average_takes: averageTakes,
          last_played: lastPlayed,
          hint_used_today: hintUsedToday,
          time_started_today: timeStartedToday
        } = data[0];

        setUser({
          id: uid,
          createdAt,
          curCorrectLetters,
          gamesWon,
          hasPlayedToday,
          isOnStreak,
          leastTakes,
          lives,
          streak,
          hasStartedToday,
          averageGuessTime,
          averageTakes,
          lastPlayed,
          hintUsedToday,
          timeStartedToday
        });
      };

      fetchUser();
    }
  }, []);

  const contextValue = {
    user,
    setUserHasPlayedToday,
    setUserLives,
    setUserCorrectLetters,
    setUserHasWon,
    setUserStreak,
    breakUserStreak,
    resetUserOnNewGame,
    setAvTakes,
    setLeastTakes,
    setUserGuessForToday
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserContext;