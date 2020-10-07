class UserRepository
  def initialize(csv_file_path)
    @csv_file_path = csv_file_path
    @elements = []
    load_csv if File.exist?(@csv_file_path)
  end

  def all
    @elements
  end

  def add_user(new_user)
    @elements << new_user
    save_csv
  end

  def remove_at(user_index)
    @elements.delete_at(user_index)
    save_csv
  end

  def find_by_name(user)
    @elements.find { |element| element.name == user }
  end

  private

  def load_csv
    csv_options = { col_sep: ',', quote_char: '"' }
    CSV.foreach(@csv_file_path, csv_options) do |row|
      @elements << User.new(row[0])
    end
  end

  def save_csv
    csv_options = { col_sep: ',', force_quotes: true, quote_char: '"' }
    CSV.open(@csv_file_path, 'wb', csv_options) do |csv|
      @elements.each do |element|
        csv << [element.name]
      end
    end
  end
end
