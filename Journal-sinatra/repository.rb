require 'csv'

# acts as a database for journal entries
class Repository
  def initialize(csv_file_path)
    @csv_file_path = csv_file_path
    @elements = []
    load_csv if File.exist?(@csv_file_path)
  end

  def all
    @elements
  end

  def add_entry(new_entry)
    @elements << new_entry
    save_csv
  end

  def remove_at(entry_index)
    @elements.delete_at(entry_index)
    save_csv
  end

  def update_entry
    save_csv
  end

  def delete_csv
    File.delete(@csv_file_path)
  end

  private

  def load_csv
    csv_options = { col_sep: ',', quote_char: '"' }
    CSV.foreach(@csv_file_path, csv_options) do |row|
      @elements << Diary.new(row[0], row[1])
    end
  end

  def save_csv
    csv_options = { col_sep: ',', force_quotes: true, quote_char: '"' }
    CSV.open(@csv_file_path, 'wb', csv_options) do |csv|
      @elements.each do |element|
        csv << [element.date_input, element.entry]
      end
    end
  end
end
